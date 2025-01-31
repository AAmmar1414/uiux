import { groq } from "next-sanity";

export const allProducts=groq`*[_type=="products"]`;
export const four=groq`*[_type=="products"][4..6]`;
export const three=groq`*[_type=="products"][0..2]`;
export const eight=groq`*[_type=="products"][0..7]`;