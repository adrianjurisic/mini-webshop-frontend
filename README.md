# Mini Webshop - Frontend

Ovo je frontend dio mini webshop aplikacije napravljen u React.js. Aplikacija pruža dva interfejsa:
- **Webshop (Guest korisnici)**
- **Admin Dashboard (za upravljanje proizvodima i narudžbama)**

## 🚀 Pokretanje projekta

> Backend API mora biti pokrenut i dostupan za ispravan rad aplikacije.
> Link za pokretanje backend-a: `https://mini-webshop-backend.onrender.com/`
  (nakon 15 minuta nekorištenja mora se ponovo pokrenuti)

> Nakon uspješno pokrenutog backend-a
> Link aplikacije: `https://mini-webshop-frontend-gamma.vercel.app/`

## 👤 Tipovi korisnika

- **Guest korisnici**: mogu pregledati proizvode, dodati ih u korpu i kreirati narudžbu.
- **Admin**: ima pristup dashboardu putem `/admin/login` gdje može upravljati proizvodima i narudžbama.

## 🧩 Funkcionalnosti

### Webshop (Guest)

- Početna stranica sa prikazom svih proizvoda
- Detaljan pregled svakog proizvoda
- Dodavanje u korpu
- Uređivanje količine i uklanjanje iz korpe
- Checkout forma s unosom korisničkih podataka
- Kreiranje i slanje narudžbe

### Admin

- Login forma (username: `adrian`, password: `admin123`)
- Dashboard sa pregledom proizvoda i narudžbi
- Dodavanje, uređivanje i brisanje proizvoda
- Promjena statusa narudžbi (Prihvaćeno, Odbijeno, Završeno)
- Filtriranje i sortiranje narudžbi

## 🌐 Deploy

- Vercel
- Link: `https://mini-webshop-frontend-gamma.vercel.app/`
