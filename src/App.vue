<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Start</RouterLink>
      </li>
      <li>
        <RouterLink to="/game">Game</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
