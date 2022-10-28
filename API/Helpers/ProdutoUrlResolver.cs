using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class ProdutoUrlResolver : IValueResolver<Produto, ProdutoToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProdutoUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Produto source, ProdutoToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ImgUrl))
            {
                return _config["ApiUrl"] + source.ImgUrl;
            }

            return null;
        }
    }
}