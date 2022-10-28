namespace Core.Entities
{
    public class Produto : BaseEntity
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string ImgUrl { get; set; }
        public ProdutoMarca ProdutosMarcas { get; set; }
        public int ProdutoMarcaId { get; set; }
        public ProdutoCategoria ProdutosCategorias { get; set; }
        public int ProdutoCategoriaId { get; set; }
    }
}