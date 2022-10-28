namespace API.Dtos
{
    public class ProdutoToReturnDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string ImgUrl { get; set; }
        public string ProdutosMarcas { get; set; }
        public string ProdutosCategorias { get; set; }
    }
}