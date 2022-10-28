using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Nome).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Descricao).IsRequired().HasMaxLength(180);
            builder.Property(p => p.Preco).HasColumnType("decimal(18,2)");
            builder.Property(p => p.ImgUrl).IsRequired();
            builder.HasOne(t => t.ProdutosMarcas).WithMany()
                .HasForeignKey(p => p.ProdutoMarcaId);
            builder.HasOne(b => b.ProdutosCategorias).WithMany()
                .HasForeignKey(p => p.ProdutoCategoriaId);
        }
    }
}