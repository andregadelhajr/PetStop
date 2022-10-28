using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CestaController : BaseApiController
    {
        private readonly ICestaRepository _cestaRepository;
        private readonly IMapper _mapper;
        public CestaController(ICestaRepository cestaRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cestaRepository = cestaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CestaCliente>> GetCestaById(string id)
        {
            var cesta = await _cestaRepository.GetCestaAsync(id);

            return Ok(cesta ?? new CestaCliente(id));
        }

        [HttpPost]
        public async Task<ActionResult<CestaCliente>> UpdateCesta(CestaClienteDto cesta)
        {
            var cestaCliente = _mapper.Map<CestaClienteDto, CestaCliente>(cesta);

            var updatedCesta = await _cestaRepository.UpdateCestaAsync(cestaCliente);

            return Ok(updatedCesta);
        }

        [HttpDelete]
        public async Task DeleteCestaAsync(string id)
        {
            await _cestaRepository.DeleteCestaAsync(id);
        }
    }
}