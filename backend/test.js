let data = [
    { price: 20, quantity: 25, option: "yes" },
    { price: 12, quantity: 25, option: "yes" },
    { price: 20, quantity: 25, option: "yes" },
    { price: 15, quantity: 25, option: "yes" },
    { price: 15, quantity: 5, option: "yes" }
  ];
  
  let resultMap = new Map();
  
 
  data.forEach(item => {
   
    let key = item.price.toString() + item.option;
  
    
    if (resultMap.has(key)) {
      let existingItem = resultMap.get(key);
      existingItem.quantity += item.quantity;
      resultMap.set(key, existingItem);
    } else {
      
      resultMap.set(key, { price: item.price, quantity: item.quantity, option: item.option });
    }
  });
  
  // Convert the map values to an array
  let result = Array.from(resultMap.values());
  
  console.log(result);
  