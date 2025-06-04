//olhinho
function mostrarSenha(idInput, idIcone) {
  const input = document.getElementById(idInput);
  const icone = document.getElementById(idIcone);

  if (input.type === "password") {
    input.type = "text";
    icone.src = "/olho_fechado.png";
    icone.alt = "Ocultar senha";
  } else {
    input.type = "password";
    icone.src = "/olho_aberto.png";
    icone.alt = "Mostrar senha";
  }
}
