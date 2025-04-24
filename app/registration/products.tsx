import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react-native';
import React from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes?: string[];
};

type CartItem = {
  productId: number;
  quantity: number;
  size?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Boné do Acampamento',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
  },
  {
    id: 2,
    name: 'Camiseta do Acampamento',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 3,
    name: 'Livro do Acampamento',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    id: 4,
    name: 'Combo Especial',
    price: 250.00,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400',
  },
];

export default function ProductsScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({});
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (productId: number, delta: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.productId === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        if (newQuantity <= 0) {
          return currentCart.filter(item => item.productId !== productId);
        }
        return currentCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (delta > 0) {
        const product = products.find(p => p.id === productId);
        if (product?.sizes && !selectedSize[productId]) {
          return currentCart;
        }
        return [...currentCart, { 
          productId, 
          quantity: 1,
          size: product?.sizes ? selectedSize[productId] : undefined
        }];
      }
      
      return currentCart;
    });
  };

  const getItemQuantity = (productId: number) => {
    return cart.find(item => item.productId === productId)?.quantity || 0;
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
    return subtotal - discount;
  };

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSize(prev => ({ ...prev, [productId]: size }));
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      setCart(currentCart =>
        currentCart.map(item =>
          item.productId === productId
            ? { ...item, size }
            : item
        )
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos Adicionais</Text>
        <Text style={styles.subtitle}>
          Escolha os produtos que deseja adicionar à sua inscrição
        </Text>
      </View>

      <View style={styles.content}>
        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <TouchableOpacity
              onPress={() => setSelectedImage(product.image)}
              style={styles.imageContainer}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>

              {product.sizes && (
                <View style={styles.sizesContainer}>
                  {product.sizes.map(size => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeButton,
                        selectedSize[product.id] === size && styles.selectedSize
                      ]}
                      onPress={() => handleSizeSelect(product.id, size)}
                    >
                      <Text style={[
                        styles.sizeText,
                        selectedSize[product.id] === size && styles.selectedSizeText
                      ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(product.id, -1)}
                >
                  <Minus size={20} color="#6b7280" />
                </TouchableOpacity>

                <Text style={styles.quantity}>
                  {getItemQuantity(product.id)}
                </Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(product.id, 1)}
                >
                  <Plus size={20} color="#6b7280" />
                </TouchableOpacity>

                <Text style={styles.totalPrice}>
                  {(product.price * getItemQuantity(product.id)).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.cartSummary}>
          <Text style={styles.summaryTitle}>Resumo do Carrinho</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {calculateTotal().toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Desconto</Text>
              <Text style={[styles.summaryValue, styles.discountText]}>
                -{discount.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={[styles.summaryValue, styles.totalText]}>
              {calculateTotal().toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#0891b2" size={20} />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/registration/review')}
          >
            <Text style={styles.buttonText}>Continuar</Text>
            <ChevronRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSelectedImage(null)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#0891b2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#0891b2',
    fontWeight: '600',
    marginBottom: 12,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  selectedSize: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  sizeText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSizeText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    minWidth: 24,
    textAlign: 'center',
  },
  totalPrice: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
  },
  cartSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  discountText: {
    color: '#059669',
  },
  totalText: {
    fontSize: 18,
    color: '#0891b2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0891b2',
  },
  backButtonText: {
    color: '#0891b2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
});