// store the function in a separate file so it's accessible to all other files
module.exports = (temp, product) => {
  // "/ /g" is a regular expression, the g-flag means global, so that all of the placeholders will get replaced and not just the first one
  let output = temp.replace(/{%product%}/g, product.productName);
  output = output.replace(/{%emoji%}/g, product.image);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%country%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%description%}/g, product.description);
  output = output.replace(/{%id%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%not-organic%}/g, "not-organic ");
  return output;
};
