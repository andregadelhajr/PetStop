namespace Core.Entities
{
    public class CestaCliente
    {
        public CestaCliente()
        {
        }

        public CestaCliente(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<CestaItem> Items { get; set; } = new List<CestaItem>();

    }
}