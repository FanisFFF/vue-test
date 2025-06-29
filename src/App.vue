<template>
  <nav style="display: flex; gap:2rem ;justify-self: center;margin-bottom: 2rem;">
    <RouterLink to="/incomes">Incomes</RouterLink>
    <RouterLink to="/orders">Orders</RouterLink>
    <RouterLink to="/sales">Sales</RouterLink>
    <RouterLink to="/stocks">Stocks</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template> 