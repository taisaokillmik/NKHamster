import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../shared/ProductCard'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

jest.mock('@/hooks/useCart')
jest.mock('@/hooks/useWishlist')

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Hamster',
    slug: 'test-hamster',
    category: 'hamster' as const,
    price: 100000,
    image: 'https://example.com/image.jpg',
    description: 'Test description',
    stock: 5,
    rating: 4.5,
    reviewCount: 10,
  }

  beforeEach(() => {
    const mockUseCart = useCart as jest.MockedFunction<typeof useCart>
    const mockUseWishlist = useWishlist as jest.MockedFunction<typeof useWishlist>
    
    mockUseCart.mockReturnValue({
      addItem: jest.fn(),
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotal: jest.fn().mockReturnValue(0),
      getItemCount: jest.fn().mockReturnValue(0),
    } as any)
    
    mockUseWishlist.mockReturnValue({
      addItem: jest.fn(),
      removeItem: jest.fn(),
      isInWishlist: jest.fn().mockReturnValue(false),
      items: [],
      clearWishlist: jest.fn(),
    } as any)
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Hamster')).toBeInTheDocument()
    expect(screen.getByText('100.000đ')).toBeInTheDocument()
    expect(screen.getByText('4.5 (10)')).toBeInTheDocument()
  })

  it('calls addToCart when buy button is clicked', async () => {
    const user = userEvent.setup()
    const mockAddToCart = jest.fn()
    const mockUseCart = useCart as jest.MockedFunction<typeof useCart>
    
    mockUseCart.mockReturnValue({
      addItem: mockAddToCart,
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotal: jest.fn().mockReturnValue(0),
      getItemCount: jest.fn().mockReturnValue(0),
    } as any)

    render(<ProductCard product={mockProduct} />)
    
    const buyButton = screen.getByText('Mua')
    await user.click(buyButton)
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('disables button when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStockProduct} />)
    
    expect(screen.getByText('Hết hàng')).toBeDisabled()
  })
})
