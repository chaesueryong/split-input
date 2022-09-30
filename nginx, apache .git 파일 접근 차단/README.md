# nginx

### nginx.conf

```
cd /etc/nginx/nginx.conf
```

```
location ~ /\.git {
  deny all;
}
```

```
systemctl restart nginx
```

# apache

### security.conf
#### 54 ~ 56 주석 해제

```
cd /etc/apache2/conf-enabled
```

```
<DirectoryMatch "/\.git">
	Require all denied
</DirectoryMatch>
```

```
service apache2 restart
```