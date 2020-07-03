const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore');
const app = express();

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo

                });
            });

        });


});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password=null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
//cambiar datos de recurso existentes en el servidor 
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);
    // no cambiar password eliminar del body la password y el google 
    /*  delete body.password;
     delete body.google; */
    //busqueda del ususario que necesito encontrar y actualizar
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});


app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let cambiarEstado = { estado: false }
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            res.json({
                ok: false,
                err: {
                    mesanseja: 'Usuario no encontrado'
                }

            });
        } else {

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });

});

module.exports = app;