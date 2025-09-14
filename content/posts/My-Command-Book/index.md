+++
date = '2024-09-01T00:00:00-00:00'
draft = false
title = 'My Command Book'
+++

### Git Clear Local Branches
Clear all local branches except for the current branche
```bash
git branch | grep -v "$(git symbolic-ref --short HEAD)" | xargs git branch -D
```

<br>

### Git Fast-Forward Merge
```bash
git merge --no-ff feature-branch
```

<br>

### Windows Creating a Symbolic Link (Like ln -s) in PowerShell

**Syntax (PowerShell 5+ / Windows 10+)**
```powershell
New-Item -ItemType SymbolicLink -Path "C:\link\myshortcut" -Target "C:\original\myfolder"
```

**Example: Link a folder**
Suppose you want to create a symbolic link from:

**Target**: `C:\Projects\RealFolder`
<br>
**Link**: `C:\Links\ShortcutToProject`

```powershell
New-Item -ItemType SymbolicLink -Path "C:\Links\ShortcutToProject" -Target "C:\Projects\RealFolder"
```

<br>