//���õķ������Է�װ���Լ���JS�ļ��У�Ȼ���Ǹ����Ҫʹ�þͱ�¶��ȥ��
//local����Ľṹkey:word,����word���滹��һ������{88:1,90:2}��������ID�ţ�ֵ������
//��������ӹ��ﳵ���ͻ��¼��Ϣ��
const key = 'buyGoodsCount';
export function getItem(){
    var gStr =  localStorage.getItem(key);
        //   ���ַ���ת����js����
        var obj = JSON.parse(gStr);

        // �ж����objΪnull�Ļ�����һ��{}
        if(!obj){
               // ��localStorage��дһ���ն���
              localStorage.setItem(key,JSON.stringify('{}'));
               return {};
           }

       return obj;
    }

//��紫�����{gid:88,bcount:1}
export function setItem(goodsinfo){
    var goodsObj = getItem();
    //�ж���û�������Ʒ
    if(goodsObj[goodsinfo.gid]){
        goodsObj[goodsinfo.gid] = goodsinfo.bcount + goodsObj[goodsinfo.gid];
    }
    else{

        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    localStorage.setItem(key,JSON.stringify(goodsObj));
}


export function removeItem(goodsid){
    var goodsObj = getItem();
    delete goodsObj[goodsid];
    localStorage.setItem(key,JSON.parse(goodsObj));
}