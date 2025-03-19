document.addEventListener("DOMContentLoaded", function () {
    // Función para guardar datos en localStorage
    function guardarDatos(id) {
        let input = document.getElementById(id);
        if (input) {
            localStorage.setItem(id, input.value);
        }
    }

    // Función para recuperar datos desde localStorage
    function recuperarDatos(id) {
        let input = document.getElementById(id);
        if (input && localStorage.getItem(id)) {
            input.value = localStorage.getItem(id);
        }
    }

    // Aplicar almacenamiento automático a los campos de los formularios
    let campos = ["identificacion", "nombre1", "nombre2", "apellido1", "apellido2", "fecha-nacimiento", "documento", "tipo_identificacion", "centro_infantil"];
    campos.forEach(id => {
        recuperarDatos(id);
        let campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener("input", function () {
                guardarDatos(id);
            });
        }
    });

    // Validar formulario antes de enviarlo
    let forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (event) {
            let camposRequeridos = form.querySelectorAll("input[required], select[required]");
            let valido = true;
            camposRequeridos.forEach(campo => {
                if (!campo.value) {
                    campo.style.border = "2px solid red";
                    valido = false;
                } else {
                    campo.style.border = "";
                }
            });
            if (!valido) {
                event.preventDefault();
                alert("Por favor, complete todos los campos obligatorios antes de continuar.");
            }
        });
    });

    // Dependencias entre selectores (departamento y municipio)
    let departamento = document.getElementById("departamento");
    let municipio = document.getElementById("municipio");
    if (departamento && municipio) {
        departamento.addEventListener("change", function () {
            let opciones = {
                "antioquia": ["Medellín", "Yarumal", "Angostura", "Marinilla", "Rionegro"],
                "atlantico": ["Barranquilla", "Soledad", "Malambo"],
                "amazonas": ["Leticia", "Puerto Nariño"]
            };
            municipio.innerHTML = "<option value=''>-- Selecciona una opción --</option>";
            if (opciones[departamento.value]) {
                opciones[departamento.value].forEach(mun => {
                    let opt = document.createElement("option");
                    opt.value = mun.toLowerCase();
                    opt.textContent = mun;
                    municipio.appendChild(opt);
                });
            }
        });
    }

    // Cambios visuales según selección en Salud
    let selectsSalud = document.querySelectorAll("#vacunas, #bucal, #visual, #sisben, #eps, #covid");
    selectsSalud.forEach(select => {
        select.addEventListener("change", function () {
            if (this.value === "si") {
                this.style.backgroundColor = "lightgreen";
            } else {
                this.style.backgroundColor = "lightcoral";
            }
        });
    });

    // Botón de confirmación antes de finalizar
    let botonFinalizar = document.querySelector("button[type='submit']");
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", function (event) {
            let confirmacion = confirm("¿Está seguro de enviar el formulario? Verifique la información antes de continuar.");
            if (!confirmacion) {
                event.preventDefault();
            }
        });
    }
});
