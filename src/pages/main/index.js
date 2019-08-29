import React, { Component } from 'react'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom';


export default class Main extends Component {

    // o estado armazena as variáveis do nosso componente e ele é sempre um objeto (a menos que usemos Hoooks)
    // as variáveis determinam como o componente será renderizado (pelo render())
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    // Métodos baseados no ciclo de vida do componente, ou ciclo de montagem do componente na tela

    // Método executado assim que o componente for mostrado em tela
    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)

        // Pego a propriedade docs (que são os produtos) e atribuo a uma nova variavel 'docs' e o restante das propriedades da resposta da api eu atribuo a uma nova variavel 'productInfo' (usando 'rest')
        const { docs, ...productInfo } = response.data

        this.setState({
            products: docs, productInfo, page
        })
    }

    prevPage = () => {
        // Pega a página e as demais informações do estado
        const { page, productInfo } = this.state

        // Compara para ver se a página atual é igual a primeira página, se sim, retorna nada
        if (page === 1) return

        const pageNumber = page - 1

        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        // Pega a página e as demais informações do estado
        const { page, productInfo } = this.state

        // Compara para ver se a página atual é igual a ultima página, se sim, retorna nada
        if (page === productInfo.pages) return

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    // O método render fica "escutando" o estado do componente, então quando o estado é alterado, o render é executado para renderizar o componente novamente
    render () {

        // Desestruturação
        const {products, productInfo, page} = this.state;

        // return <h1>Contagem de produtos: {this.state.products.length}</h1>
        return <div className="product-list">
            {products.map(product => (
                // toda vez que usarmos o map, precisamos identificar o primeiro elemento depois do map, pra isso usamos o atributo key
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>
                    Anterior
                </button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>
                    Próximo
                </button>
            </div>
        </div>
    }
} 