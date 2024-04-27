import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { homePageQuery } from "@/queris/homeage";

const baseUrl = getStrapiURL();

export const fetchData = async (url: string) => {
    const authToken = null; // we will implement this later getAuthToken() later
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };

    try {
        const response = await fetch(url, authToken ? headers : {});
        const data = await response.json();
        return flattenAttributes(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // or return null;
    }
}

export const getHomePageData = async () => {
    const url = new URL("/api/home-page", baseUrl);
    0
    url.search = homePageQuery

    return await fetchData(url.href);
}