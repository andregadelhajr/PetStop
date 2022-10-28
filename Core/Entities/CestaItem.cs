namespace Core.Entities
{
    public class CestaItem
    {
        public int Id { get; set; }
        public string ProdutoNome { get; set; }
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public string ImgUrl { get; set; }
        public string? Categoria { get; set; }
        public string? Marca { get; set; }

    }
}