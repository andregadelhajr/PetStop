using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class CestaRepository : ICestaRepository
    {
        private readonly IDatabase _database;
        public CestaRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<CestaCliente> GetCestaAsync(string cestaId)
        {
            var data = await _database.StringGetAsync(cestaId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CestaCliente>(data);
        }

        public async Task<CestaCliente> UpdateCestaAsync(CestaCliente cesta)
        {
            var created = await _database.StringSetAsync(cesta.Id, 
                JsonSerializer.Serialize(cesta), TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetCestaAsync(cesta.Id);
        }
        
        public async Task<bool> DeleteCestaAsync(string cestaId)
        {
            return await _database.KeyDeleteAsync(cestaId);
        }

    }
}