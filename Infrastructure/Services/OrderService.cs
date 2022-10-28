using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly ICestaRepository _cestaRepo;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(ICestaRepository cestaRepo, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _cestaRepo = cestaRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int delieveryMethodId, string basketId, Address shippingAddress)
        {
            // get cesta from repo
            var cesta = await _cestaRepo.GetCestaAsync(basketId);

            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in cesta.Items)
            {
                var productItem = await _unitOfWork.Repository<Produto>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Nome, productItem.ImgUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Preco, item.Quantidade);
                items.Add(orderItem);
            }

            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(delieveryMethodId);

            // calc subtotal
            // var spec = new OrderByPaymentIntentWithItemsSpecification(cesta.);
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            // TODO: save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // delete cesta
            await _cestaRepo.DeleteCestaAsync(basketId);

            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
} 