using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly LojaContext _context;
        public ProdutoRepository(LojaContext context)
        {
            _context = context;
        }

        public async Task<Produto> GetProdutoByIdAsync(int Id)
        {
            return await _context.Produtos
                .Include(p => p.ProdutosCategorias)
                .Include(p => p.ProdutosMarcas)
                .FirstOrDefaultAsync(p => p.Id == Id);
        }

        public async Task<IReadOnlyList<ProdutoCategoria>> GetProdutoCategoriasAsync()
        {
            return await _context.ProdutoCategorias.ToListAsync();
        }


        public async Task<IReadOnlyList<Produto>> GetProdutosAsync()
        {    
            return await _context.Produtos
                .Include(p => p.ProdutosCategorias)
                .Include(p => p.ProdutosMarcas)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<ProdutoMarca>> GetProdutoMarcasAsync()
        {
            return await _context.ProdutoMarcas.ToListAsync();
        }
    }
}