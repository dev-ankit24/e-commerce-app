import { all } from "redux-saga/effects";
import maincategorySagas from "./MaincategorySags";
import subcategorySagas from "./Services/SubcategorySags"
import brandSagas from "./Services/BrandSags";
import productSagas from "./Services/ProductSags";
import testimonialSagas from "./Services/TestimonialSags";
import cartSagas from "./Services/CartSags";
import wishlistSagas from "./Services/WishlistSags";
import checkoutSagas from "./Services/CheckoutSags ";
import contactUsSagas from "./Services/ContactUsSags";
import newsletterSagas from "./Services/NewsletterSags";
export default function* RootSagas(){
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        cartSagas(),
        wishlistSagas(),
        checkoutSagas(),
        newsletterSagas(),
        contactUsSagas()    
    ])
} 