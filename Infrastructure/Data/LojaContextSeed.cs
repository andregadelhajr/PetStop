using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class LojaContextSeed
    {
        public static async Task SeedAsync(LojaContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProdutoCategorias.Any())
                {
                    var CategoriasData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/categoria.json");
                    var categorias = JsonSerializer.Deserialize<List<ProdutoCategoria>>(CategoriasData);

                    foreach (var item in categorias)
                    {
                        context.ProdutoCategorias.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProdutoMarcas.Any())
                {
                    var marcasData = File.ReadAllText("../Infrastructure/Data/SeedData/marca.json");
                    var marcas = JsonSerializer.Deserialize<List<ProdutoMarca>>(marcasData);

                    foreach (var item in marcas)
                    {
                        context.ProdutoMarcas.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Produtos.Any())
                {
                    var ProdutosData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/produto.json");
                    var produtos = JsonSerializer.Deserialize<List<Produto>>(ProdutosData);

                    foreach (var item in produtos)
                    {
                        context.Produtos.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData =
                        File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                    var delivery = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach (var item in delivery)
                    {
                        context.DeliveryMethods.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<LojaContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}