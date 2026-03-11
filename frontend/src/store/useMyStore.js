import { create } from "zustand";
import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/products'

const useMyStore = create((set, get) => ({
    products: [],
    isLoading: false,
    homeLabel: "All",
    deleteId: null,
    searchInputValue: "",

    fetchData: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get(BASE_URL)
            set({ products: res.data.data || res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetching data:', error)
            set({ isLoading: false })
        }
    },

    deleteFunc: async () => {
        const { deleteId, products } = get()
        if (!deleteId) return
        try {
            await axios.delete(`${BASE_URL}/${deleteId}`)
            set({ products: products.filter(p => p.id !== deleteId), deleteId: null })
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    },

    setSearchInputValue: (value) => set({searchInputValue: value}),
    deleteData: (id) => set({ deleteId: id }),
    setHomeLabel: (value) => set({ homeLabel: value }),
}))

export default useMyStore