$(document).ready(() => {

  SDK.User.loadNav();
  const currentUser = SDK.User.current();
  const $myeventlist = $("#my-events-list");

  $(".main-header").html(`
    <h1>Hi, ${currentUser.firstName} ${currentUser.lastName}</h1>
  `);


  SDK.Event.fineMineEvents((err, Event) => {
    if(err) throw err;
    orders.forEach(order => {
      $basketTbody.append(`
        <tr>
            <td>${order.id}</td>
            <td>${parseOrderItems(order.orderItems)}</td>
            <td>kr. ${sumTotal(order.orderItems)}</td>
        </tr>
      `);
    });
  });

  function parseOrderItems(items){
    return items.map(item => {
      return item.count + " x " + item.bookInfo.title
    }).join(", ");
  }

  function sumTotal(items){
    let total = 0;
    items.forEach(item => {
      total += item.count * item.bookInfo.price
    });
    return total;
  }


});