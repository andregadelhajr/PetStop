using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProdutosWithMarcasAndCategoriasSpecification : BaseSpecification<Produto>
    {
        public ProdutosWithMarcasAndCategoriasSpecification(ProdutoSpecParams produtoParams) 
            : base(x =>
                (string.IsNullOrEmpty(produtoParams.Search) || x.Nome.ToLower().Contains(produtoParams.Search)) &&
                (!produtoParams.CategoriaId.HasValue || x.ProdutoCategoriaId == produtoParams.CategoriaId) &&
                (!produtoParams.MarcaId.HasValue || x.ProdutoMarcaId == produtoParams.MarcaId) 
            )
        {
            AddInclude(x => x.ProdutosMarcas);
            AddInclude(x => x.ProdutosCategorias);
            AddOrderBy(x => x.Nome);
            ApplyPaging(produtoParams.PageSize * (produtoParams.PageIndex - 1), produtoParams.PageSize);

            if (!string.IsNullOrEmpty(produtoParams.Sort))
            {
                switch(produtoParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Preco);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Preco);
                        break;
                    default:
                        AddOrderBy(n => n.Nome);
                        break;
                }
            }
        }

        public ProdutosWithMarcasAndCategoriasSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProdutosMarcas);
            AddInclude(x => x.ProdutosCategorias);
        }
    }
}