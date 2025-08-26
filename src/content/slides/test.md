---
title: Using ressources
description: test lecture for reference.
pubDate: 2022-07-01
draft: true
---
## Handling resources with Use

---
<section data-background-video="https://static.slid.es/site/homepage/v1/homepage-video-editor.mp4" 
          data-background-video-loop data-background-video-muted>
  <h2>Video</h2>
</section>
---

Resources in the Kotlin/JVM standard library

- FileReader <!-- .element: class="fragment" -->.
- java.sql.Connection <!-- .element: class="fragment" -->.
- InputStream <!-- .element: class="fragment" -->.
- etc. <!-- .element: class="fragment" -->.

Notes: Ressources in the Kotlin/JVM sdt library need to be managed

---
```Kotlin [1-8|6]
fun countCharInFile(path: String) Int {
	val reader = BufferedReader(FileReader(path))
	try {
		return reader.lineSequence().sumOf { it.length }
	} finally {
		reader.close()
	}
}
```
Notes: Typical java style code. Code is incorrect and buggy

---

But they implement the `closable` interface
![closable](/assets/lectures/test/closable.png)

---

Use the `use` keyword!

Notes: Which means we can use the use keyword to automaticaly close them.

---

```Kotlin [1-6|3]
fun countCharInFile(path: String) Int {
	val reader = BufferedReader(FileReader(path))
	reader.use {
		return reader.lineSequence().sumOf { it.lengh }
	}
}
```

---
```Kotlin [2-4]
fun countCharInFile(path: String) Int {
	BufferedReader(FileReader(path)).use { reader -> 
		return reader.lineSequence().sumOf { it.lengh }
	}
}
```
Notes: The receiver is passed as an argument so we can simplify

---
```Kotlin [2-4]
fun countCharInFile(path: String) Int {
    File(path).useLines { lines ->
        return lines.sumOf { it.lenght }
    }
}
```
Notes: Even better we can use the Kotlin Std library with the useLines function

---

```Kotlin [1-5|1]
fun countCharInFile(path: String) Result<Int> = RunCatching {
	File(path).useLines { lines ->
        lines.sumOf { it.length }
    }
}
```
Notes: We can make our code safer by using returning a Result. 
Now the caller has to handle the possible failure states.

---

Usage

```Kotlin
countCharInFileException("file.txt")
	.onSuccess { println("Char count: $it") }
	.onFailure { println(it.message) }
```
Notes: Example usage

---

<iframe src="https://link.excalidraw.com/readonly/5585TndcayrniXalBa7h?darkMode=true" width="100%" height="100%" style="border: none;"></iframe>

---
### Reference

- `Effective Kotlin` by Marcin Moskala
- Kotlin Idoms: [kotlinlang.org/docs/idioms.html](https://kotlinlang.org/docs/idioms.html#java-7-s-try-with-resources)

---

<!-- .slide: data-background-image="image.png" -->

---

## Thank you

- @vinsg
- Website: [vinsg.ca](https://vinsg.ca)
- Presentation: [Source]()


