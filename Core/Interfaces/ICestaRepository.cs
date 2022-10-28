using Core.Entities;

namespace Core.Interfaces
{
    public interface ICestaRepository
    {
         Task<CestaCliente> GetCestaAsync(string cestaId);
         Task<CestaCliente> UpdateCestaAsync(CestaCliente cesta);
         Task<bool> DeleteCestaAsync(string cestaId);
    }
}