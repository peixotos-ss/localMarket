/// Gemini pra quem sabe do pai aiaia

$(document).ready(function() {
    // Carrega o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listElement = $('#lista');
    const totalElement = $("#total");
    const pedidoElement = $("#pedido");

    // Esconde o parágrafo de sucesso ao carregar a página
    pedidoElement.hide();

    function exibirCarrinho(){
        listElement.empty();
        let totalPreco = 0;

        if (carrinho.length === 0) {
            listElement.append("<p class='text-muted'>Seu carrinho está vazio.</p>");
            totalElement.text("Total: R$ 0.00");
            return;
        }

        // Criamos uma lista dinâmica (UL) com classes do Bootstrap para ficar elegante
        const ul = $("<ul>").addClass("list-group mb-3");

        $.each(carrinho, function(index, item){
            const precoItem = item.sal ? parseFloat(item.sal) : 0;
            totalPreco += precoItem;

            // Cria o item da lista (LI)
            const listItem = $("<li>")
                .addClass("list-group-item d-flex justify-content-between align-items-center")
                .text(`${item.desc} - R$ ${precoItem.toFixed(2)}`);

            // Botão de remover individual
            const removeButton = $("<button>")
                .text("❌")
                .addClass("btn btn-sm p-0 ms-2")
                .click(function(){
                    removerItem(index);
                });

            listItem.append(removeButton);
            ul.append(listItem);
        });

        // Adiciona a lista construída dentro da div #lista
        listElement.append(ul);
        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`);
    }

    function removerItem(index){
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    // [RESOLVIDO] Função atrelada ao onclick="gerar()" do HTML
    window.gerar = function() {
        if (carrinho.length === 0) {
            alert("Não há itens no carrinho para gerar um recibo!");
            return;
        }

        // Aqui entraria a lógica de biblioteca externa para o Word, se necessário.
        console.log("Baixando recibo dos itens:", carrinho);

        // Mostra a mensagem de sucesso na tela com efeito visual
        pedidoElement.fadeIn();

        // Limpa o carrinho após finalizar
        carrinho = [];
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    };

    // [RESOLVIDO] Função atrelada ao onclick="successClose()" do HTML
    window.successClose = function() {
        pedidoElement.fadeOut();
    };

    // Inicializa a renderização da página
    exibirCarrinho();
});