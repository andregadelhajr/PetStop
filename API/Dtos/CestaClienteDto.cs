
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CestaClienteDto
    {
        [Required]
        public string Id { get; set; }
        public List<CestaItemDto> Items { get; set; }

        // public int? MetodoEntregaId { get; set; }
        // public string CodigoCliente { get; set; }
        // public string MetodoPagId { get; set; }
        // public decimal PrecoFrete { get; set; } 
    }
}