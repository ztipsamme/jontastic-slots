<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Start</RouterLink>
      </li>
      <li>
        <RouterLink to="/game">Game</RouterLink>
      </li>
      <li><RouterLink to="/shop">Shop</RouterLink></li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
  nav {
    padding: 15px;
  }
  ul,
  li {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    color: black;
  }
</style>
