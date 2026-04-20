"use strict";

const form      = document.getElementById("formulario");
const btnEnviar = document.getElementById("btn-enviar");
const estado    = document.getElementById("estado");

function validar(id, errId, condicion, msg) {
  const campo = document.getElementById(id);
  const err   = document.getElementById(errId);
  const val   = campo.value.trim();

  if (condicion(val)) {
    campo.classList.remove("invalido");
    campo.classList.add("valido");
    err.textContent = "";
    return true;
  } else {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    err.textContent = msg;
    return false;
  }
}

function validarTodo() {
  const okNombre = validar(
    "nombre", "nombre-err",
    v => v.length >= 3 && v.length <= 50,
    "El nombre debe tener entre 3 y 50 caracteres."
  );

  const okEmail = validar(
    "email", "email-err",
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    "Ingresa un correo electrónico válido."
  );

  const okFecha = validar(
    "fecha", "fecha-err",
    v => v !== "",
    "Selecciona una fecha."
  );

  const okServicio = validar(
    "servicio", "servicio-err",
    v => v !== "",
    "Selecciona un servicio."
  );

  const okMensaje = validar(
    "mensaje", "mensaje-err",
    v => v.length >= 10 && v.length <= 300,
    "El mensaje debe tener entre 10 y 300 caracteres."
  );

  const radioSeleccionado = document.querySelector('input[name="preferencia"]:checked');
  const radioErr = document.getElementById("radio-err");
  let okRadio = true;
  if (!radioSeleccionado) {
    radioErr.textContent = "Selecciona una preferencia de contacto.";
    okRadio = false;
  } else {
    radioErr.textContent = "";
    okRadio = true;
  }

  const terminos = document.getElementById("terminos");
  const terminosErr = document.getElementById("terminos-err");
  let okTerminos = true;
  if (!terminos.checked) {
    terminosErr.textContent = "Debes aceptar los términos y condiciones.";
    okTerminos = false;
  } else {
    terminosErr.textContent = "";
    okTerminos = true;
  }

  return okNombre && okEmail && okFecha && okServicio && okMensaje && okRadio && okTerminos;
}

["nombre", "email", "fecha", "servicio", "mensaje"].forEach(id => {
  document.getElementById(id).addEventListener("blur", validarTodo);
});

document.getElementById("terminos").addEventListener("change", validarTodo);

document.querySelectorAll('input[name="preferencia"]').forEach(r => {
  r.addEventListener("change", validarTodo);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validarTodo()) {
    const primero = form.querySelector(".invalido");
    if (primero) primero.focus();
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";
  estado.textContent = "";
  estado.className = "";

  await new Promise(r => setTimeout(r, 1500));

  estado.textContent = "✔ Mensaje enviado correctamente.";
  estado.className = "ok";
  form.reset();

  form.querySelectorAll("input, textarea, select").forEach(el => {
    el.classList.remove("valido", "invalido");
  });

  btnEnviar.disabled = false;
  btnEnviar.textContent = "Enviar mensaje";
});