  
import * as Yup from "yup";

const calculatorAddValidations = Yup.object().shape({
	itemName: Yup
		.string()
        .required("item adı boş bırakılamaz")
        .max(80,"item adı en fazla 80 karakter olabilir"),
	itemPrice: Yup
		.string()
        .required("item fiyatını boş bırakamazsınız")
        .max(10,"item fiyati en fazla 10 karakter olabilir")
        .matches(/^[0-9]+$/, "sadece sayı giriniz")
	
});

module.exports = calculatorAddValidations;