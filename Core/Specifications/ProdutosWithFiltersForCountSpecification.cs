using Core.Entities;

namespace Core.Specifications
{
    public class ProdutosWithFiltersForCountSpecification : BaseSpecification<Produto>
    {
        public ProdutosWithFiltersForCountSpecification( ProdutoSpecParams produtoParams) 
            : base(x =>
                (string.IsNullOrEmpty(produtoParams.Search) || x.Nome.ToLower().Contains(produtoParams.Search)) &&
                (!produtoParams.CategoriaId.HasValue || x.ProdutoCategoriaId == produtoParams.CategoriaId) &&
                (!produtoParams.MarcaId.HasValue || x.ProdutoMarcaId == produtoParams.MarcaId) 
            )
        {
        }
    }
}