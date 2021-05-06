String.prototype.removeDot = function removeDot() {
    return this.split('.').join("");
};
String.prototype.priceWithDot = function priceWithDot() {
    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};