var form = document.getElementById("cliente-form");
var tipoSelect = document.getElementById("tipo");
var camposDinamicos = document.getElementById("campos-dinamicos");
var resultado = document.getElementById("resultado");

tipoSelect.addEventListener("change", function () {
  var tipoEscolhido = tipoSelect.value;

  if (tipoEscolhido === "f") {
    camposDinamicos.innerHTML =
      '<label for="cpf">CPF</label>' +
      '<input id="cpf" name="cpf" type="text" required>' +
      '<label for="rg">RG</label>' +
      '<input id="rg" name="rg" type="text" required>';
  } else if (tipoEscolhido === "j") {
    camposDinamicos.innerHTML =
      '<label for="cnpj">CNPJ</label>' +
      '<input id="cnpj" name="cnpj" type="text" required>' +
      '<label for="ie">IE</label>' +
      '<input id="ie" name="ie" type="text" required>';
  } else {
    camposDinamicos.innerHTML = "";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var tipo = form.tipo.value;
  var nome = form.nome.value;
  var endereco = form.endereco.value;
  var valorCompra = parseFloat(form.valorCompra.value);

  if (tipo === "" || nome === "" || endereco === "") {
    alert("Preencha todos os campos.");
    return;
  }

  if (isNaN(valorCompra) || valorCompra < 0) {
    alert("Digite um valor de compra valido.");
    return;
  }

  var imposto = 0;
  var total = 0;
  var titulo = "";
  var dadosExtras = "";

  if (tipo === "f") {
    titulo = "Pessoa Fisica";
    imposto = valorCompra * 0.1;

    var cpf = form.cpf ? form.cpf.value : "";
    var rg = form.rg ? form.rg.value : "";

    dadosExtras =
      "<p><b>CPF:</b> " + cpf + "</p>" +
      "<p><b>RG:</b> " + rg + "</p>";
  } else if (tipo === "j") {
    titulo = "Pessoa Juridica";
    imposto = valorCompra * 0.2;

    var cnpj = form.cnpj ? form.cnpj.value : "";
    var ie = form.ie ? form.ie.value : "";

    dadosExtras =
      "<p><b>CNPJ:</b> " + cnpj + "</p>" +
      "<p><b>IE:</b> " + ie + "</p>";
  } else {
    alert("Selecione o tipo de cliente.");
    return;
  }

  total = valorCompra + imposto;

  resultado.innerHTML =
    "<h2>Resultado - " + titulo + "</h2>" +
    "<p><b>Nome:</b> " + nome + "</p>" +
    "<p><b>Endereco:</b> " + endereco + "</p>" +
    dadosExtras +
    "<p><b>Valor da compra:</b> R$ " + valorCompra.toFixed(2) + "</p>" +
    "<p><b>Imposto:</b> R$ " + imposto.toFixed(2) + "</p>" +
    "<p><b>Total a pagar:</b> R$ " + total.toFixed(2) + "</p>";

  resultado.classList.remove("hidden");
});
