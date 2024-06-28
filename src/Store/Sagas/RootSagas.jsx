import { all } from "redux-saga/effects";
import maincategorySagas from "./MaincategorySags";
import subcategorySagas from "./Services/SubcategorySags"
import brandSagas from "./Services/BrandSags";
import productSagas from "./Services/ProductSags";
import testimonialSagas from "./Services/TestimonialSags";
export default function* RootSagas(){
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas()
    
    ])
} 