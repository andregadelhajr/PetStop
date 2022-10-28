using Core.Entities;

namespace Core.Interfaces
{
    public interface IProdutoRepository
    {
        Task<Produto> GetProdutoByIdAsync(int Id);
        Task<IReadOnlyList<Produto>> GetProdutosAsync();
        Task<IReadOnlyList<ProdutoCategoria>> GetProdutoCategoriasAsync();
        Task<IReadOnlyList<ProdutoMarca>> GetProdutoMarcasAsync();
    }
}