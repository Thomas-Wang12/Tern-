import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLElement
import kotlin.browser.document

class RuleArea(val overview: String, val ruleSections: List<RuleSection>) {
	fun showRules(container: HTMLElement) {
		val rulesButton = document.createElement("button") as HTMLButtonElement
		val rulesArea = document.createElement("div") as HTMLDivElement
		rulesButton.textContent = "Rules"
		rulesArea.innerHTML = overview
		rulesArea.className = "rules-area hidden"
		container.appendChild(rulesButton)
		container.appendChild(rulesArea)
		rulesButton.onclick = {
			if (rulesArea.classList.length > 1)
				rulesArea.className = "rules-area"
			else
				rulesArea.className = "rules-area hidden"
		}
		for (section in ruleSections)
			section.addToContainer(rulesArea)
	}
}

class RuleSection(val name: String, val content: String) {
	fun addToContainer(container: HTMLDivElement) {
		val rulesButton = document.createElement("button") as HTMLButtonElement
		val rulesArea = document.createElement("div") as HTMLDivElement
		rulesButton.textContent = name
		rulesArea.className = "rules-area hidden"
		rulesArea.innerHTML = content
		container.appendChild(rulesButton)
		container.appendChild(rulesArea)
		rulesButton.onclick = {
			if (rulesArea.classList.length > 1)
				rulesArea.className = "rules-area"
			else
				rulesArea.className = "rules-area hidden"
		}
	}
}