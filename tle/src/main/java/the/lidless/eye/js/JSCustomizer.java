package the.lidless.eye.js;


public class JSCustomizer {
	
	//TODO move
	public static final String COOKIE_EXPIRES_DOMAIN_PATH_KEY = "\\$\\{the.lidless.eye.sitemark.cookie.expires_domain_path\\}";

	private String jsTemplate;
	private String cookieExpires;
	private String cookieDomain;
	private String cookiePath;
	
	public JSCustomizer() {
		super();
	}

	public JSCustomizer(String jsTemplate, String cookieExpires, String cookieDomain, String cookiePath) {
		super();
		this.jsTemplate = jsTemplate;
		this.cookieExpires = cookieExpires;
		this.cookieDomain = cookieDomain;
		this.cookiePath = cookiePath;
	}

	public void setJsTemplate(String jsTemplate) {
		this.jsTemplate = jsTemplate;
	}
	public void setCookieExpires(String cookieExpires) {
		this.cookieExpires = cookieExpires;
	}
	public void setCookieDomain(String cookieDomain) {
		this.cookieDomain = cookieDomain;
	}
	public void setCookiePath(String cookiePath) {
		this.cookiePath = cookiePath;
	}

	public String getCustomizedJs() {
		String cookieExpiresDomainPath = "";
		if (cookieExpires != null) {
			cookieExpiresDomainPath += "expires=" + cookieExpires;
		}
		if (cookieDomain != null) {
			cookieExpiresDomainPath += (!cookieExpiresDomainPath.isEmpty() ? ";" : "") + "domain=" + cookieDomain;
		}
		if (cookiePath != null) {
			cookieExpiresDomainPath += (!cookieExpiresDomainPath.isEmpty() ? ";" : "") + "path=" + cookiePath;
		}
		
		String customizedJs = null;
		if (jsTemplate != null) {
			customizedJs = jsTemplate.replaceAll(COOKIE_EXPIRES_DOMAIN_PATH_KEY, cookieExpiresDomainPath);
		}
		return customizedJs;
	}

}
