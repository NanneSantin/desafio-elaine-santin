class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        //definido a comanda inicial
        const comanda = [
            { codigo: 'cafe', valor: 300, quantidade: 0 },
            { codigo: 'chantily', valor: 150, quantidade: 0 },
            { codigo: 'suco', valor: 620, quantidade: 0 },
            { codigo: 'sanduiche', valor: 650, quantidade: 0 },
            { codigo: 'queijo', valor: 200, quantidade: 0 },
            { codigo: 'salgado', valor: 725, quantidade: 0 },
            { codigo: 'combo1', valor: 950, quantidade: 0 },
            { codigo: 'combo2', valor: 750, quantidade: 0 },
        ];

        if (itens.length < 1) {
            return "Não há itens no carrinho de compra!";
        }

        let totalDeItens = 0;
        let totalPedido = 0;

        for (const elemento of itens) {
            //desestruturando o array dos itens para pegar o codigo e a quantidade
            const [codigo, quantidade] = elemento.split(',');

            //buscando o item dentro da comanda
            const item = comanda.find(item => item.codigo === codigo);

            if (!item) {
                return "Item inválido!";
            }

            //pegando a quantidade total de itens
            totalDeItens += Number(quantidade);
            //alterando a quantidade dos itens na comanda conforme quantidades passada no input
            item.quantidade += Number(quantidade);

            //calculando o total do pedido
            if (item.quantidade > 0) {
                totalPedido += (item.valor * item.quantidade);
            }
        }

        //Verificar se o pedido possui pelo menos 1 item com quantidade maior que zero.
        if (totalDeItens <= 0) {
            return "Quantidade inválida!";
        }

        const queijo = comanda.find(item => item.codigo === 'queijo');
        const chantily = comanda.find(item => item.codigo === 'chantily');
        const sanduiche = comanda.find(item => item.codigo === 'sanduiche');
        const cafe = comanda.find(item => item.codigo === 'cafe');

        if (queijo.quantidade > 0 && sanduiche.quantidade === 0) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (chantily.quantidade > 0 && cafe.quantidade === 0) {
            return "Item extra não pode ser pedido sem o principal";
        }

        const formasDePagamento = ['dinheiro', 'credito', 'debito'];

        if (!formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        if (metodoDePagamento === 'dinheiro') {
            totalPedido -= (totalPedido * 0.05);
        }
        if (metodoDePagamento === 'credito') {
            totalPedido += (totalPedido * 0.03);
        }

        const aPagar = String((totalPedido / 100).toFixed(2)).replace('.', ',');

        return `R$ ${aPagar}`;
    }

}

export { CaixaDaLanchonete };
