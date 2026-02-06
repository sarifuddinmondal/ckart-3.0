<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CKART - Beauty & Care</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary: #ff4757;
            --secondary: #2f3542;
            --accent: #f1c40f;
            --bg: #f8f9fa;
        }

        body { font-family: 'Segoe UI', sans-serif; margin: 0; background: var(--bg); color: var(--secondary); overflow-x: hidden; }

        header {
            background: white; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;
        }

        .logo { font-size: 28px; font-weight: bold; color: var(--primary); letter-spacing: 1px; cursor: pointer; }
        .search-container { flex: 0.6; position: relative; }
        .search-container input { width: 100%; padding: 10px 40px 10px 15px; border: 1px solid #ddd; border-radius: 20px; outline: none; }
        .search-container i { position: absolute; right: 15px; top: 12px; color: #888; }
        
        .nav-icons { display: flex; gap: 20px; align-items: center; }
        .nav-icons i { font-size: 22px; cursor: pointer; transition: 0.3s; position: relative; }
        .nav-icons i:hover { color: var(--primary); }
        
        #cart-count {
            position: absolute; top: -10px; right: -10px; background: var(--primary);
            color: white; font-size: 12px; padding: 2px 6px; border-radius: 50%;
        }

        .hero {
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1350&q=80');
            height: 350px; background-size: cover; background-position: center;
            display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center;
        }
        .hero h1 { font-size: 40px; margin-bottom: 10px; }

        .container { padding: 30px 5%; }
        .section-title { font-size: 24px; font-weight: bold; margin-bottom: 25px; border-left: 5px solid var(--primary); padding-left: 10px; }
        
        .product-grid { 
            display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; 
        }

        .product-card {
            background: white; border-radius: 12px; overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s; border: 1px solid #eee;
        }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .product-card img { width: 100%; height: 200px; object-fit: cover; }
        .p-info { padding: 15px; text-align: center; }
        .p-name { font-weight: bold; font-size: 16px; margin-bottom: 8px; height: 40px; overflow: hidden; }
        .p-price { font-size: 18px; color: var(--primary); font-weight: bold; }

        .btn-add {
            background: var(--secondary); color: white; border: none; width: 100%;
            padding: 10px; border-radius: 6px; cursor: pointer; margin-top: 10px; transition: 0.3s;
        }
        .btn-add:hover { background: var(--primary); }

        .sidebar {
            position: fixed; right: -350px; top: 0; width: 320px; height: 100%;
            background: white; box-shadow: -5px 0 15px rgba(0,0,0,0.1); z-index: 2000;
            transition: 0.4s; padding: 20px;
        }
        .sidebar.active { right: 0; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 15px; }
        .cart-item { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .cart-item img { width: 50px; height: 50px; border-radius: 5px; }
    </style>
</head>
<body>

    <header>
        <div class="logo" onclick="location.reload()">CKART</div>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="সন্ধান করুন...">
            <i class="fas fa-search"></i>
        </div>
        <div class="nav-icons">
            <i class="fas fa-user" id="userIcon" title="Login"></i>
            <i class="fas fa-shopping-bag" id="cartIcon">
                <span id="cart-count">0</span>
            </i>
        </div>
    </header>

    <div class="hero">
        <h1>Authentic Beauty & Care</h1>
        <p>আপনার রূপচর্চায় সেরা পন্যের সমাহার</p>
    </div>

    <div class="container">
        <div class="section-title">আমাদের প্রোডাক্ট সমূহ</div>
        <div class="product-grid" id="productList">
            <p style="text-align: center; width: 100%;">প্রোডাক্ট লোড হচ্ছে...</p>
        </div>
    </div>

    <div class="sidebar" id="cartSidebar">
        <div class="cart-header">
            <h3>আপনার ঝুলি</h3>
            <i class="fas fa-times" id="closeCart" style="cursor: pointer;"></i>
        </div>
        <div id="cartItemsList" style="margin-top: 15px; height: 70%; overflow-y: auto;"></div>
        <div style="padding-top: 20px; border-top: 1px solid #ddd;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
                <span>মোট:</span>
                <span id="cartTotalPrice">TK 0</span>
            </div>
            <button onclick="location.href='order.html'" style="width: 100%; background: var(--primary); color: white; border: none; padding: 15px; margin-top: 15px; border-radius: 8px; font-weight: bold; cursor: pointer;">অর্ডার করুন</button>
        </div>
    </div>

    <script type="module">
        import { supabase } from './supabaseClient.js';

        let cart = JSON.parse(localStorage.getItem('ckart_cart')) || [];

        // ১. প্রোডাক্ট লোড করা (Supabase)
        async function fetchProducts() {
            const productList = document.getElementById('productList');
            const { data: products, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error("Error:", error);
                productList.innerHTML = "<p>প্রোডাক্ট লোড করতে সমস্যা হয়েছে।</p>";
                return;
            }

            productList.innerHTML = "";
            if (products) {
                products.forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${p.image}" alt="${p.name}">
                        <div class="p-info">
                            <div class="p-name">${p.name}</div>
                            <div class="p-price">TK ${p.price}</div>
                            <button class="btn-add">Add to Cart</button>
                        </div>`;
                    
                    // Add to cart event
                    card.querySelector('.btn-add').onclick = () => addToCart(p);
                    productList.appendChild(card);
                });
            } else {
                productList.innerHTML = "<p>কোনো প্রোডাক্ট পাওয়া যায়নি।</p>";
            }
        }

        // ২. কার্টে যোগ করা
        function addToCart(product) {
            cart.push(product);
            localStorage.setItem('ckart_cart', JSON.stringify(cart));
            updateCartUI();
            alert("কার্টে যোগ করা হয়েছে!");
        }

        // ৩. কার্ট ইন্টারফেস আপডেট
        function updateCartUI() {
            const list = document.getElementById('cartItemsList');
            const totalDisp = document.getElementById('cartTotalPrice');
            const cartCount = document.getElementById('cart-count');
            
            list.innerHTML = ""; 
            let total = 0;
            
            cart.forEach((item, i) => {
                total += parseFloat(item.price);
                list.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}">
                        <div style="flex:1;">
                            <div style="font-size:14px; font-weight:bold;">${item.name}</div>
                            <div style="color:var(--primary)">TK ${item.price}</div>
                        </div>
                        <i class="fas fa-trash removeItem" data-index="${i}" style="cursor:pointer; color:#ccc;"></i>
                    </div>`;
            });
            
            cartCount.innerText = cart.length;
            totalDisp.innerText = "TK " + total.toFixed(0);

            // Trash icon click event
            document.querySelectorAll('.removeItem').forEach(btn => {
                btn.onclick = (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    localStorage.setItem('ckart_cart', JSON.stringify(cart));
                    updateCartUI();
                };
            });
        }

        // ৪. গুগল লগইন (Supabase Auth)
        async function loginWithGoogle() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) alert("লগইন ব্যর্থ হয়েছে!");
        }

        // ৫. ইভেন্ট লিসেনারস
        document.getElementById('userIcon').onclick = loginWithGoogle;
        document.getElementById('cartIcon').onclick = () => document.getElementById('cartSidebar').classList.toggle('active');
        document.getElementById('closeCart').onclick = () => document.getElementById('cartSidebar').classList.remove('active');

        // পেজ লোড হলে ফাংশনগুলো রান করা
        fetchProducts();
        updateCartUI();
    </script>
</body>
</html>