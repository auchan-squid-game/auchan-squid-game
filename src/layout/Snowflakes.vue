<template>
  <div id="snowflakes"></div>
</template>

<script>
  import { perlin1D } from '@leodeslf/perlin-noise';

  class Vector {
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    add(v) {
      this.x += v.x;
      this.y += v.y;
    }

    mult(n) {
      this.x *= n;
      this.y *= n;
    }

    copy() {
      return new Vector(this.x, this.y);
    }

    limit(n) {
      this.y = this.y < n ? this.y : n;
    }
  }

  class Snowflake {
    constructor(sx, sy) {
      const x = sx || Math.floor(Math.random() * window.innerWidth);
      const y = sy || Math.floor(Math.random() * -90) - 10;

      this.pos = new Vector(x, y);
      this.vel = new Vector();
      this.acc = new Vector();
      this.radius = Math.floor(Math.random() * 6) + 4;
      this.angle = Math.floor(Math.random() * Math.PI * 2);
      this.xOffset = 0;

      this.snowflakeElement = document.createElement('div');
      this.snowflakeElement.style.position = 'absolute';
      this.snowflakeElement.style.width = `${this.radius}px`;
      this.snowflakeElement.style.height = `${this.radius}px`;
      this.snowflakeElement.style.borderRadius = '50%';
      this.snowflakeElement.style.background = 'white';
      document.getElementById('snowflakes').appendChild(this.snowflakeElement);
    }

    render() {
      this.snowflakeElement.style.top = `${this.pos.y}px`;
      this.snowflakeElement.style.left = `${this.pos.x}px`;
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.radius);
      this.pos.add(this.vel);
      this.acc.mult(0);

      this.xOffset = Math.sin(this.angle) * this.radius;
      this.pos.x = this.pos.x + this.xOffset;

      if (this.pos.y > window.innerHeight + this.radius) this.randomize();
      if (this.pos.x < -this.radius) this.pos.x = window.innerWidth + this.radius;
      if (this.pos.x > window.innerWidth + this.radius) this.pos.x = -this.radius;
    }

    applyForce(force) {
      const f = force.copy();
      f.mult(this.radius);
      this.acc.add(f);
    }

    randomize() {
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * -90) - 10;

      this.pos = new Vector(x, y);
      this.vel = new Vector();
      this.acc = new Vector();
      this.radius = Math.floor(Math.random() * 6) + 4;
    }
  }

  export default {
    name: 'Snowflakes',
    mounted() {
      const gravity = new Vector(0, 0.98);

      const snow = [...Array(Math.round(window.innerWidth / 10)).keys()].map(() => {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * (window.innerHeight + 150));
        return new Snowflake(x, y);
      });

      let zOffset = 0;

      setInterval(() => {
        zOffset += 0.1;

        snow.forEach(snowflake => {
          const wAngle = perlin1D(zOffset) * Math.PI * 2;
          const wind = new Vector(wAngle);
          wind.mult(0.01);

          snowflake.applyForce(gravity);
          snowflake.applyForce(wind);
          snowflake.update();
          snowflake.render();
        });
      }, 50);
    },
  };
</script>

<style lang="scss" scoped>
  #snowflakes {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
</style>
