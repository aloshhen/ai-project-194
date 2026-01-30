import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  Star, Heart, Gift, ShoppingCart, ChevronLeft, ChevronRight, 
  Mail, Phone, MapPin, Check, Globe, Menu, X, Video, Camera,
  Send, CheckCircle, Package, Award, Calendar
} from 'lucide-react'

// Translation data
const translations = {
  en: {
    nav: {
      collection: 'Collection',
      about: 'About',
      delivery: 'Delivery',
      contact: 'Contact',
      orderNow: 'Order Now'
    },
    hero: {
      title: 'Fairytale Dresses',
      subtitle: 'Where Every Girl Becomes a Princess',
      description: 'Handcrafted festive dresses for your little princess. Made with love, designed for unforgettable moments.',
      cta: 'View Collection',
      videoCta: 'Watch Video'
    },
    features: {
      title: 'Why Choose Us',
      quality: 'Premium Quality',
      qualityDesc: 'Only the finest fabrics and materials for your child\'s comfort and elegance.',
      handmade: 'Handcrafted',
      handmadeDesc: 'Each dress is carefully crafted by skilled artisans with attention to every detail.',
      unique: 'Unique Designs',
      uniqueDesc: 'Exclusive designs that make your little one stand out at any celebration.'
    },
    collection: {
      title: 'Our Collection',
      subtitle: 'Festive Dresses for Special Moments',
      price: 'from',
      addToCart: 'Add to Cart',
      special: 'Special Offer'
    },
    gifts: {
      title: 'Special Gifts',
      subtitle: 'With Every Purchase',
      gift1: 'Matching Hair Accessories',
      gift1Desc: 'Beautiful hairband or bow to complete the look',
      gift2: 'Gift Packaging',
      gift2Desc: 'Elegant box perfect for gifting',
      gift3: 'Photo Session Tips',
      gift3Desc: 'Guide for capturing perfect moments'
    },
    delivery: {
      title: 'Delivery Options',
      subtitle: 'Fast & Reliable Shipping',
      novaPoshta: 'Nova Poshta',
      novaPoshtaDesc: 'Delivery to any branch across Ukraine within 1-3 days',
      courier: 'Courier Delivery',
      courierDesc: 'Direct delivery to your door in major cities',
      days: 'days'
    },
    video: {
      title: 'See Our Dresses in Action',
      subtitle: 'Video Reviews from Happy Customers'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have questions? We\'d love to hear from you!',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for reaching out. We\'ll get back to you soon.',
      sendAnother: 'Send Another Message'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  uk: {
    nav: {
      collection: 'Колекція',
      about: 'Про нас',
      delivery: 'Доставка',
      contact: 'Контакти',
      orderNow: 'Замовити'
    },
    hero: {
      title: 'Казкові Сукні',
      subtitle: 'Де Кожна Дівчинка Стає Принцесою',
      description: 'Святкові сукні ручної роботи для вашої маленької принцеси. Створені з любов\'ю для незабутніх моментів.',
      cta: 'Переглянути Колекцію',
      videoCta: 'Дивитись Відео'
    },
    features: {
      title: 'Чому Обирають Нас',
      quality: 'Преміум Якість',
      qualityDesc: 'Тільки найкращі тканини та матеріали для комфорту та елегантності вашої дитини.',
      handmade: 'Ручна Робота',
      handmadeDesc: 'Кожна сукня ретельно виготовлена майстрами з увагою до кожної деталі.',
      unique: 'Унікальні Дизайни',
      uniqueDesc: 'Ексклюзивні дизайни, які виділять вашу малечу на будь-якому святі.'
    },
    collection: {
      title: 'Наша Колекція',
      subtitle: 'Святкові Сукні для Особливих Моментів',
      price: 'від',
      addToCart: 'Додати в Кошик',
      special: 'Спеціальна Пропозиція'
    },
    gifts: {
      title: 'Спеціальні Подарунки',
      subtitle: 'З Кожною Покупкою',
      gift1: 'Аксесуари для Волосся',
      gift1Desc: 'Красива пов\'язка або бантик для завершення образу',
      gift2: 'Подарункова Упаковка',
      gift2Desc: 'Елегантна коробка ідеальна для подарунка',
      gift3: 'Поради для Фотосесії',
      gift3Desc: 'Гід для створення ідеальних фотографій'
    },
    delivery: {
      title: 'Варіанти Доставки',
      subtitle: 'Швидка та Надійна Доставка',
      novaPoshta: 'Нова Пошта',
      novaPoshtaDesc: 'Доставка у будь-яке відділення по Україні протягом 1-3 днів',
      courier: 'Кур\'єрська Доставка',
      courierDesc: 'Пряма доставка до ваших дверей у великих містах',
      days: 'днів'
    },
    video: {
      title: 'Наші Сукні в Дії',
      subtitle: 'Відео Відгуки Щасливих Клієнтів'
    },
    contact: {
      title: 'Зв\'яжіться з Нами',
      subtitle: 'Маєте питання? Ми будемо раді почути від вас!',
      name: 'Ваше Ім\'я',
      email: 'Ваш Email',
      message: 'Ваше Повідомлення',
      send: 'Надіслати',
      sending: 'Відправка...',
      successTitle: 'Повідомлення Надіслано!',
      successDesc: 'Дякуємо за звернення. Ми зв\'яжемося з вами найближчим часом.',
      sendAnother: 'Надіслати Ще Одне Повідомлення'
    },
    footer: {
      rights: 'Всі права захищені.'
    }
  }
}

// Form handler hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)
    
    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

function App() {
  const [lang, setLang] = useState('en')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Replace with your Web3Forms Access Key

  // Product data
  const products = [
    {
      id: 1,
      image: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_1383364807/user-photo-1.jpg?',
      nameEn: 'Princess Rose',
      nameUk: 'Принцеса Роза',
      price: 1200,
      special: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      nameEn: 'Sky Fairy',
      nameUk: 'Небесна Фея',
      price: 1350
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&q=80',
      nameEn: 'Gentle Dream',
      nameUk: 'Ніжна Мрія',
      price: 1150
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      nameEn: 'Pearl Princess',
      nameUk: 'Перлинна Принцеса',
      price: 1400,
      special: true
    }
  ]

  const slides = [
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_1383364807/user-photo-1.jpg?',
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&q=80',
    'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=1200&q=80',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80'
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // Animation refs
  const featuresRef = useRef(null)
  const collectionRef = useRef(null)
  const giftsRef = useRef(null)
  const deliveryRef = useRef(null)
  
  const featuresInView = useInView(featuresRef, { once: true })
  const collectionInView = useInView(collectionRef, { once: true })
  const giftsInView = useInView(giftsRef, { once: true })
  const deliveryInView = useInView(deliveryRef, { once: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-milky via-cream to-powder/20">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-powder/30 shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-powder to-skyblue p-2 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                Fairytale Dresses
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#collection" className="text-gray-700 hover:text-pink-400 transition-colors font-medium">
                {t.nav.collection}
              </a>
              <a href="#about" className="text-gray-700 hover:text-pink-400 transition-colors font-medium">
                {t.nav.about}
              </a>
              <a href="#delivery" className="text-gray-700 hover:text-pink-400 transition-colors font-medium">
                {t.nav.delivery}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-pink-400 transition-colors font-medium">
                {t.nav.contact}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'en' ? 'uk' : 'en')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-powder/30 to-skyblue/30 rounded-full hover:from-powder/50 hover:to-skyblue/50 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="font-semibold">{lang === 'en' ? 'EN' : 'УК'}</span>
              </button>
              
              <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-pink-200">
                <ShoppingCart className="w-4 h-4" />
                {t.nav.orderNow}
              </button>

              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pt-4 pb-2 space-y-3"
              >
                <a href="#collection" className="block text-gray-700 hover:text-pink-400 transition-colors font-medium">
                  {t.nav.collection}
                </a>
                <a href="#about" className="block text-gray-700 hover:text-pink-400 transition-colors font-medium">
                  {t.nav.about}
                </a>
                <a href="#delivery" className="block text-gray-700 hover:text-pink-400 transition-colors font-medium">
                  {t.nav.delivery}
                </a>
                <a href="#contact" className="block text-gray-700 hover:text-pink-400 transition-colors font-medium">
                  {t.nav.contact}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO WITH SLIDER */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-skyblue/20 via-powder/20 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-black mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-blue-400 bg-clip-text text-transparent leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-2xl md:text-3xl text-pink-400 mb-6 font-display font-semibold">
                {t.hero.subtitle}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-pink-200 flex items-center justify-center gap-2">
                  {t.hero.cta}
                  <Star className="w-5 h-5" />
                </button>
                <button className="bg-white/80 hover:bg-white text-pink-500 px-8 py-4 rounded-full text-lg font-bold transition-all border-2 border-pink-200 flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  {t.hero.videoCta}
                </button>
              </div>
            </motion.div>

            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    alt="Dress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-pink-500" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-pink-500" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="about" ref={featuresRef} className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.features.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: t.features.quality, desc: t.features.qualityDesc, color: 'from-pink-400 to-pink-500' },
              { icon: Heart, title: t.features.handmade, desc: t.features.handmadeDesc, color: 'from-purple-400 to-pink-400' },
              { icon: Star, title: t.features.unique, desc: t.features.uniqueDesc, color: 'from-blue-400 to-purple-400' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-gradient-to-br from-milky to-white p-8 rounded-3xl border-2 border-powder/30 hover:border-pink-300 transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" ref={collectionRef} className="py-20 px-6 bg-gradient-to-b from-powder/10 to-skyblue/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: collectionInView ? 1 : 0, y: collectionInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.collection.title}
            </h2>
            <p className="text-xl text-gray-600 font-display">{t.collection.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: collectionInView ? 1 : 0, y: collectionInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={lang === 'en' ? product.nameEn : product.nameUk}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.special && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {t.collection.special}
                    </div>
                  )}
                  <button className="absolute top-4 left-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                    {lang === 'en' ? product.nameEn : product.nameUk}
                  </h3>
                  <p className="text-pink-500 text-2xl font-bold mb-4">
                    {t.collection.price} {product.price} ₴
                  </p>
                  <button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {t.collection.addToCart}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFTS */}
      <section ref={giftsRef} className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: giftsInView ? 1 : 0, y: giftsInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.gifts.title}
            </h2>
            <p className="text-xl text-gray-600 font-display">{t.gifts.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Star, title: t.gifts.gift1, desc: t.gifts.gift1Desc },
              { icon: Gift, title: t.gifts.gift2, desc: t.gifts.gift2Desc },
              { icon: Camera, title: t.gifts.gift3, desc: t.gifts.gift3Desc }
            ].map((gift, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: giftsInView ? 1 : 0, y: giftsInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-center p-8 bg-gradient-to-br from-powder/20 to-skyblue/20 rounded-3xl border-2 border-pink-200 hover:border-pink-300 transition-all transform hover:scale-105"
              >
                <div className="bg-gradient-to-br from-pink-400 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <gift.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">{gift.title}</h3>
                <p className="text-gray-600 leading-relaxed">{gift.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" ref={deliveryRef} className="py-20 px-6 bg-gradient-to-b from-skyblue/10 to-powder/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: deliveryInView ? 1 : 0, y: deliveryInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.delivery.title}
            </h2>
            <p className="text-xl text-gray-600 font-display">{t.delivery.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: deliveryInView ? 1 : 0, x: deliveryInView ? 0 : -30 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-3xl shadow-xl border-2 border-powder/30 hover:border-pink-300 transition-all"
            >
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Package className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">{t.delivery.novaPoshta}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{t.delivery.novaPoshtaDesc}</p>
              <div className="flex items-center gap-3 text-pink-500 font-bold text-lg">
                <Calendar className="w-6 h-6" />
                <span>1-3 {t.delivery.days}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: deliveryInView ? 1 : 0, x: deliveryInView ? 0 : 30 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-3xl shadow-xl border-2 border-powder/30 hover:border-pink-300 transition-all"
            >
              <div className="bg-gradient-to-br from-pink-400 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">{t.delivery.courier}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{t.delivery.courierDesc}</p>
              <div className="flex items-center gap-3 text-pink-500 font-bold text-lg">
                <Calendar className="w-6 h-6" />
                <span>1-2 {t.delivery.days}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.video.title}
            </h2>
            <p className="text-xl text-gray-600 font-display">{t.video.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-powder/30">
              <video
                src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_1383364807/user-video-3.MOV?"
                controls
                className="w-full h-full object-cover"
                poster="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_1383364807/user-photo-1.jpg?"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-powder/10 to-skyblue/10">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-600 font-display">{t.contact.subtitle}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-powder/30">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                  className="space-y-6"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contact.name}
                      required
                      className="w-full px-6 py-4 bg-gradient-to-r from-powder/10 to-skyblue/10 border-2 border-powder/30 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors text-lg"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contact.email}
                      required
                      className="w-full px-6 py-4 bg-gradient-to-r from-powder/10 to-skyblue/10 border-2 border-powder/30 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors text-lg"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder={t.contact.message}
                      rows="5"
                      required
                      className="w-full px-6 py-4 bg-gradient-to-r from-powder/10 to-skyblue/10 border-2 border-powder/30 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors resize-none text-lg"
                    ></textarea>
                  </div>
                  
                  {isError && (
                    <div className="text-red-500 text-sm bg-red-50 p-4 rounded-xl">
                      {errorMessage}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:transform-none shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.contact.send}
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="text-center py-12"
                >
                  <div className="bg-gradient-to-br from-green-400 to-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-display font-bold text-gray-800 mb-4">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-pink-500 hover:text-pink-600 font-semibold text-lg transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-400 to-pink-500 p-3 rounded-full">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">+380 XX XXX XXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-3 rounded-full">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">info@fairytaledresses.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-gray-50 to-white border-t-2 border-powder/30 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-powder to-skyblue p-2 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                Fairytale Dresses
              </span>
            </div>
            <div className="text-gray-500 text-sm text-center">
              © 2024 Fairytale Dresses. {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App