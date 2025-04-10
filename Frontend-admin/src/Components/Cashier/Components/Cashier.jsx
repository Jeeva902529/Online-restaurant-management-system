"use client"

import { useEffect, useState } from "react"
import {
  Clock,
  DollarSign,
  Utensils,
  Check,
  RefreshCw,
  AlertTriangle,
  Search,
  Filter,
  ChevronDown,
  ArrowLeft,
  User,
  Bell,
  X,
} from "lucide-react"
import logo from "../Assets/Logo.png"

const API_URL = "http://localhost:5000/api/orders/my-orders"

// OrderItem component with toggle for details
const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-[#ff3131]/30 transition-all duration-300">
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start space-x-3">
          <div className="bg-[#122348]/10 p-2 rounded-full mt-1">
            <Utensils size={16} className="text-[#ff3131]" />
          </div>
          <div>
            <p className="font-semibold text-[#122348]">{order.foodName}</p>
            <p className="text-sm text-gray-600">{formatCurrency(order.totalPrice)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">
            {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            className={`w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300 ${expanded ? "rotate-180 bg-[#ff3131]/10" : "bg-gray-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 animate-fade-in-down">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Price:</span>
            <span className="font-medium">{formatCurrency(order.basePrice)}</span>
          </div>

          {order.addOns && order.addOns.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#122348]">Add-Ons:</p>
              <div className="bg-gray-50 rounded-md p-2">
                {order.addOns.map((addOn, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {addOn.name} × {addOn.quantity}
                    </span>
                    <span className="font-medium">{formatCurrency(addOn.price * addOn.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.specialInstructions && (
            <div className="bg-yellow-50 border-l-2 border-yellow-200 p-2 rounded-r-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
              </p>
            </div>
          )}

          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            Ordered at: {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  )
}

// OrderCard component
const OrderCard = ({ tableNumber, totalAmount, orders, onMarkPaid }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handlePaid = () => {
    if (isConfirming) {
      onMarkPaid(tableNumber)
      setIsConfirming(false)
    } else {
      setIsConfirming(true)
      // Auto reset after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000)
    }
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-[#122348] to-[#1a3266] text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 ${isHovered ? "animate-pulse-slow" : ""}`}
            >
              <span className="font-bold text-lg">{tableNumber}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Table {tableNumber}</h3>
              <p className="text-sm text-gray-300">
                {orders.length} item{orders.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
            <p className="text-xs text-gray-300">Total Amount</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {new Date(orders[0]?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <button
            onClick={handlePaid}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
              isConfirming
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            }`}
          >
            {isConfirming ? (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Confirm
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Mark as Paid
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const OrdersPage = () => {
  const [groupedOrders, setGroupedOrders] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredOrders, setFilteredOrders] = useState({})

  const fetchOrders = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      const grouped = data.reduce((acc, order) => {
        const tableNo = order.tableNumber
        if (!acc[tableNo]) {
          acc[tableNo] = { totalAmount: 0, orders: [], paid: false }
        }
        acc[tableNo].orders.push(order)
        acc[tableNo].totalAmount += order.totalPrice
        return acc
      }, {})

      setGroupedOrders(grouped)
      setFilteredOrders(grouped)
      setError(null)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError("Failed to load orders. Please try again.")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Filter orders based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredOrders(groupedOrders)
      return
    }

    const lowerCaseQuery = searchQuery.toLowerCase()
    const filtered = Object.entries(groupedOrders).reduce((acc, [tableNo, data]) => {
      // Check if table number matches
      if (tableNo.toLowerCase().includes(lowerCaseQuery)) {
        acc[tableNo] = data
        return acc
      }

      // Check if any food item matches
      const matchingOrders = data.orders.filter((order) => order.foodName.toLowerCase().includes(lowerCaseQuery))

      if (matchingOrders.length > 0) {
        acc[tableNo] = {
          ...data,
          orders: matchingOrders,
        }
      }

      return acc
    }, {})

    setFilteredOrders(filtered)
  }, [searchQuery, groupedOrders])

  useEffect(() => {
    fetchOrders()

    // Set up polling every 30 seconds
    const intervalId = setInterval(fetchOrders, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const handleMarkPaid = async (tableNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/mark-paid/${tableNumber}`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      setGroupedOrders((prevOrders) => {
        const newOrders = { ...prevOrders }
        delete newOrders[tableNumber]
        return newOrders
      })

      // Show success notification
      const notification = document.getElementById("notification")
      notification.textContent = `Table ${tableNumber} marked as paid and cleared.`
      notification.classList.remove("hidden")
      notification.classList.add("animate-fade-in-down")

      setTimeout(() => {
        notification.classList.add("animate-fade-out")
        setTimeout(() => {
          notification.classList.add("hidden")
          notification.classList.remove("animate-fade-out")
        }, 500)
      }, 3000)
    } catch (error) {
      console.error("Error marking as paid:", error)
      setError("Failed to mark as paid. Please try again.")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#122348] text-white p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <img src={logo || "/placeholder.svg"} alt="Crave Corner Logo" className="h-8 w-auto mr-3" />
            Crave Corner
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="relative">
              
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-[#ff3131] flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm hidden md:inline">Cashier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center py-2 px-4">
          <button className="flex items-center text-[#122348] hover:text-[#ff3131] transition-colors mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
          </button>
          <div className="h-5 w-px bg-gray-300 mx-2"></div>
          <span className="text-[#ff3131] font-medium">Orders</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#122348]">Orders</h2>
            <p className="text-gray-600">Manage customer orders by table</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search table or food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3131] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <div className="relative">
                
              </div>

              <button
                onClick={() => fetchOrders()}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 bg-[#122348] hover:bg-[#122348]/90 text-white px-4 py-2 rounded-lg transition-colors ${isRefreshing ? "opacity-70" : ""}`}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing <span className="font-medium">{Object.keys(filteredOrders).length}</span> tables
            {searchQuery && (
              <span>
                {" "}
                matching "<span className="font-medium">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Notification */}
        <div
          id="notification"
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hidden z-50"
        >
          Table marked as paid and cleared.
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-md">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3131]"></div>
          </div>
        ) : Object.keys(filteredOrders).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <DollarSign className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchQuery ? "No Orders Match Your Search" : "No Active Orders"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try a different search term or clear the search"
                : "All tables have been cleared and paid."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => fetchOrders()}
                className="px-4 py-2 bg-[#ff3131] text-white rounded-lg hover:bg-[#e62c2c] transition-colors"
              >
                Refresh Orders
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(filteredOrders).map(([tableNumber, data]) => (
              <OrderCard
                key={tableNumber}
                tableNumber={tableNumber}
                totalAmount={data.totalAmount}
                orders={data.orders}
                onMarkPaid={handleMarkPaid}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage

