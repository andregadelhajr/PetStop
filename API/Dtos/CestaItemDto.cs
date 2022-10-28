using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CestaItemDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string ProdutoNome { get; set; }

        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "O preço deve ser maior que 0")]
        public decimal Preco { get; set; }

        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "A quantidade deve ser pelo menos 1")]
        public int Quantidade { get; set; }

        [Required]
        public string ImgUrl { get; set; }


        public string? Categoria { get; set; }
        public string? Marca { get; set; }
    }
}