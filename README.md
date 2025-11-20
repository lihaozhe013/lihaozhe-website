# How to start dev server

### Clone
```bash
git clone --recurse-submodules https://github.com/lihaozhe013/lihaozhe-website.git
```

### If you didn't clone submodules, run
```bash
git submodule update --init --recursive
```

### Update to latest tips of remote branches
```bash
git submodule update --recursive --remote
```

or

```bash
git pull --recurse-submodules
```

or

```bash
git submodule update --recursive
```

### Start Server
```bash
hugo server -D
```
