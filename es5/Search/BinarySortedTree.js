'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BinaryTree2 = require('../BinaryTree/BinaryTree');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BSTNode = function (_BinaryTree) {
    (0, _inherits3.default)(BSTNode, _BinaryTree);

    function BSTNode() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, BSTNode);

        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(BSTNode)).call.apply(_Object$getPrototypeO, [this].concat(arg)));
    }

    /**
     * BST树的查找（递归）
     * @param {*} key
     * @returns {*}
     */


    (0, _createClass3.default)(BSTNode, [{
        key: 'search',
        value: function search(key) {
            if (this.data != null) {
                if (this.data === key) return this;else if (key < this.data) {
                    if (this.leftChild) return this.leftChild.search(key);
                } else {
                    if (this.rightChild) return this.rightChild.search(key);
                }
            }

            return null;
        }

        /**
         * BST树的查找（非递归）
         * @param {*} key
         * @returns {*}
         */

    }, {
        key: 'searchNonRecursive',
        value: function searchNonRecursive(key) {
            if (this.data == null) return null;

            var p = this;
            while (p && p.data !== key) {
                if (key < p.data) p = p.leftChild;else p = p.rightChild;
            }

            if (!p || key !== p.data) return null;else return p;
        }

        /**
         * BST树的插入（递归）
         * @param {*} key
         */

    }, {
        key: 'insert',
        value: function insert(key) {
            if (this.data == null) {
                this.data = key;
                return;
            }
            if (key === this.data) return;

            var node = new BSTNode(key);
            if (key < this.data) {
                if (!this.leftChild) this.leftChild = node;
                this.leftChild.insert(key);
            } else {
                if (!this.rightChild) this.rightChild = node;
                this.rightChild.insert(key);
            }
        }

        /**
         * BST树的插入（非递归）
         * @param {*} key
         */

    }, {
        key: 'insertNonRecursive',
        value: function insertNonRecursive(key) {
            if (this.data == null) {
                this.data = key;
                return;
            }

            var p = this;
            var q = void 0;
            while (p) {
                if (p.data === key) return;
                // q作为p的父节点
                q = p;
                if (key < p.data) p = p.leftChild;else p = p.rightChild;
            }

            var node = new BSTNode(key);
            if (key < q.data) q.leftChild = node;else q.rightChild = node;
        }

        /**
         * 利用BST树的插入操作建立一棵BST树
         * @param {Array} arr
         * @param {Boolean|undefined} useNonRecursive 是否使用非递归
         */

    }, {
        key: 'createBST',
        value: function createBST(arr, useNonRecursive) {
            var i = void 0;
            if (useNonRecursive) {
                for (i = 0; i < arr.length; ++i) {
                    this.insertNonRecursive(arr[i]);
                }
            } else {
                for (i = 0; i < arr.length; ++i) {
                    this.insert(arr[i]);
                }
            }

            return this;
        }

        /**
         * 使用递归的方法删除与关键字符合的结点
         * @param {*} key 需要查找的关键字
         * @param {BSTNode} parent 父节点，内部调用需要用到
         * @returns {Boolean}
         */

    }, {
        key: 'remove',
        value: function remove(key, parent) {
            // 空结点的情况
            if (this.data == null) return false;

            // 找到关键字
            if (this.data === key) return deleteNode(this, parent);
            // 查找左子树，如果有的话
            else if (key < this.data) {
                    if (this.leftChild) return this.leftChild.remove(key, this);
                }
                // 查找右子树，如果有的话
                else {
                        if (this.rightChild) return this.rightChild.remove(key, this);
                    }

            // 未找到
            return false;
        }

        /**
         * 非递归删除与关键字符合的结点
         * @param {*} key 需要查找的关键字
         * @returns {boolean}
         */

    }, {
        key: 'removeNonRecursive',
        value: function removeNonRecursive(key) {
            var p = this;
            var f = void 0;

            while (p && p.data !== key) {
                f = p;
                if (key < p.data) p = p.leftChild;else p = p.rightChild;
            }

            // 没有要删除的结点
            if (!p) return false;

            // 找到了要删除的结点p
            var s = p;
            var q = void 0;
            // 如果有左右子树
            if (p.leftChild && p.rightChild) {
                f = p;
                s = p.leftChild;

                // 找到左子树的最大右子树，即仅小于左子树的值的结点
                while (s.rightChild) {
                    f = s;
                    s = s.rightChild;
                }

                p.data = s.data;
            }

            // 若s有左子树，右子树为空
            if (s.leftChild) q = s.leftChild;else q = s.rightChild;

            // 只有一个根结点的情况
            if (!f) this.data = null;else if (f.leftChild == s) f.leftChild = q;else f.rightChild = q;

            return true;
        }

        /**
         * 找到小于x的最大元素和大于x的最小元素
         * @param {String|Number} x
         * @returns {Array} [min, max]
         */

    }, {
        key: 'findNeighborElem',
        value: function findNeighborElem(x) {
            var last = typeof this.data === 'number' ? -Infinity : 'a';
            var ret = [];

            void function recurse(tree, x) {
                if (tree.leftChild) recurse(tree.leftChild, x);
                if (last < x && tree.data >= x) ret[0] = last;
                if (last <= x && tree.data > x) ret[1] = tree.data;
                last = tree.data;
                if (tree.rightChild) recurse(tree.rightChild, x);
            }(this, x);

            return ret;
        }

        /**
         * 把二叉排序树bst合并到该树中
         * @param {BSTNode} bst
         */

    }, {
        key: 'merge',
        value: function merge(bst) {
            if (bst.leftChild) this.merge(bst.leftChild);
            if (bst.rightChild) this.merge(bst.rightChild);
            this.insert(bst.data);
        }

        /**
         * 把结点插入到合适位置
         * @param {BSTNode} node 待插入的结点
         */

    }, {
        key: 'insertNode',
        value: function insertNode(node) {
            if (this.data == null) {
                this.data = node.data;
            } else {
                if (node.data > this.data) {
                    if (!this.rightChild) this.rightChild = node;else this.rightChild.insertNode(node);
                } else if (node.data < this.data) {
                    if (!this.leftChild) this.leftChild = node;else this.leftChild.insertNode(node);
                }
            }

            node.leftChild = node.rightChild = null;
        }

        /**
         * 分裂为两棵二叉排序树
         * @param {*} x
         * @returns {BSTNode[a, b]} a的元素全部小于等于x，b的元素全部大于x
         */

    }, {
        key: 'split',
        value: function split(x) {
            var a = new BSTNode();
            var b = new BSTNode();

            void function split(tree, x) {
                if (tree.leftChild) split(tree.leftChild, x);
                if (tree.rightChild) split(tree.rightChild, x);
                if (tree.data <= x) a.insertNode(tree);else b.insertNode(tree);
            }(this, x);

            return [a, b];
        }

        /**
         * 判断tree是否是二叉排序树
         * @param tree
         */

    }], [{
        key: 'isBSTTree',
        value: function isBSTTree(tree) {
            var last = typeof tree.data === 'number' ? -Infinity : 'a';
            var flag = true;

            void function isBSTTree(tree) {
                if (tree.leftChild && flag) isBSTTree(tree.leftChild);
                if (tree.data < last) flag = false;
                last = tree.data;
                if (tree.rightChild && flag) isBSTTree(tree.rightChild);
            }(tree);

            return flag;
        }
    }]);
    return BSTNode;
}(_BinaryTree2.BinaryTree);

/**
 * 删除结点
 * @param {BSTNode} p 要删除的结点
 * @param {BSTNode} parent 要删除的结点的父节点
 * @returns {boolean} 返回删除成功
 */
/*
 动态查找

 当查找表以线性表的形式组织时，若对查找表进行插入、删除或排序操作，就必须移动大量的记录，当记录数很多时，这种移动的代价很大。
 利用树的形式组织查找表，可以对查找表进行动态高效的查找。


 二叉排序树(BST)的定义

 二叉排序树(Binary Sort Tree或Binary Search Tree) 的定义为：二叉排序树或者是空树，或者是满足下列性质的二叉树。
 (1) ：若左子树不为空，则左子树上所有结点的值(关键字)都小于根结点的值；
 (2) ：若右子树不为空，则右子树上所有结点的值(关键字)都大于根结点的值；
 (3) ：左、右子树都分别是二叉排序树。
 结论：若按中序遍历一棵二叉排序树，所得到的结点序列是一个递增序列。


 BST树的查找
 1  查找思想
 首先将给定的K值与二叉排序树的根结点的关键字进行比较：若相等： 则查找成功；
 ① 给定的K值小于BST的根结点的关键字：继续在该结点的左子树上进行查找；
 ② 给定的K值大于BST的根结点的关键字：继续在该结点的右子树上进行查找。

 在随机情况下，二叉排序树的平均查找长度ASL和㏒(n)(树的深度)是等数量级的。


 BST树的插入

 在BST树中插入一个新结点，要保证插入后仍满足BST的性质。

 1 插入思想
 在BST树中插入一个新结点x时，若BST树为空，则令新结点x为插入后BST树的根结点；否则，将结点x的关键字与根结点T的关键字进行比较：
 ① 若相等： 不需要插入；
 ②  若x.key<T->key：结点x插入到T的左子树中；
 ③  若x.key>T->key：结点x插入到T的右子树中。

 由结论知，对于一个无序序列可以通过构造一棵BST树而变成一个有序序列。
 由算法知，每次插入的新结点都是BST树的叶子结点，即在插入时不必移动其它结点，仅需修改某个结点的指针。


 BST树的删除

 1  删除操作过程分析
 从BST树上删除一个结点，仍然要保证删除后满足BST的性质。设被删除结点为p，其父结点为f ，删除情况如下：
 ①  若p是叶子结点： 直接删除p。
 ②  若p只有一棵子树(左子树或右子树)：直接用p的左子树(或右子树)取代p的位置而成为f的一棵子树。即原来p是f的左子树，则p的子树成为f的左子树；原来p是f的右子树，则p的子树成为f的右子树。
 ③ 若p既有左子树又有右子树 ：处理方法有以下两种，可以任选其中一种。
 ◆  用p的直接前驱结点代替p。即从p的左子树中选择值最大的结点s放在p的位置(用结点s的内容替换结点p内容)，然后删除结点s。s是p的左子树中的最右边的结点且没有右子树，对s的删除同②。
 ◆ 用p的直接后继结点代替p。即从p的右子树中选择值最小的结点s放在p的位置(用结点s的内容替换结点p内容)，然后删除结点s。s是p的右子树中的最左边的结点且没有左子树，对s的删除同②。

 */

exports.default = BSTNode;
function deleteNode(p, parent) {
    // 叶子结点或只有一个结点
    if (!p.leftChild && !p.rightChild) {
        // 当前结点是其父结点的左子树还是右子树
        var pos = parent && parent.leftChild == p ? 'leftChild' : 'rightChild';
        if (parent) parent[pos] = null;
        // 只有一个结点的情况
        else p.data = null;
    }
    // 只有左子树
    else if (!p.rightChild) {
            p.data = p.leftChild.data;
            p.leftChild = p.leftChild.leftChild;
        }
        // 只有右子树
        else if (!p.leftChild) {
                p.data = p.rightChild.data;
                p.rightChild = p.rightChild.rightChild;
            }
            // 左右子树都有
            else {
                    var s = p.leftChild;
                    // q为父结点
                    var q = p;
                    // 找到左子树的最大右子树，即仅小于左子树的值的结点
                    while (s.rightChild) {
                        q = s;
                        s = s.rightChild;
                    }

                    p.data = s.data;
                    if (q != p) q.rightChild = s.leftChild;else q.leftChild = s.leftChild;
                }

    return true;
}

var bst = new BSTNode();
bst.createBST([45, 24, 53, 12, 24, 90]);
console.log(bst.search(12));
console.log(bst.search(13));

var bst2 = new BSTNode();
bst2.createBST([45, 24, 53, 12, 24, 90], true);
console.log(bst2.searchNonRecursive(12));
console.log(bst2.searchNonRecursive(13));

console.log('\nfindSiblingElem: ');
console.log(bst.findNeighborElem(12) + '');
console.log(bst.findNeighborElem(90) + '');
console.log(bst.findNeighborElem(45) + '');

console.log(bst.remove(45));
console.log(bst.remove(1));
console.log(bst.remove(53));
console.log(bst.remove(12));
console.log(bst.remove(90));
console.log(bst.remove(24));
console.log(bst.remove(2));

//console.log(bst2.removeNonRecursive(45));
//console.log(bst2.removeNonRecursive(1));
//console.log(bst2.removeNonRecursive(53));
//console.log(bst2.removeNonRecursive(12));
//console.log(bst2.removeNonRecursive(90));
//console.log(bst2.removeNonRecursive(24));
//console.log(bst2.removeNonRecursive(2));

console.log('\nisBSTTree: ');
console.log(BSTNode.isBSTTree(bst));
//console.log(BSTNode.isBSTTree(sosTree));


/**
 * 从大到小输出二叉排序树中所有不小于x的元素
 * @param bst
 * @param x
 */
function printNotLessThan(bst, x) {
    if (bst.rightChild) printNotLessThan(bst.rightChild, x);
    if (bst.data < x) return;
    console.log(bst.data);
    if (bst.leftChild) printNotLessThan(bst.leftChild, x);
}

console.log('\nprintNotLessThan: ');
printNotLessThan(bst2, 90);
console.log('\n');
printNotLessThan(bst2, 12);

bst.merge(bst2);

var a1 = new BSTNode(5);
var a2 = new BSTNode(91);
bst2.insertNode(a1);
bst2.insertNode(a2);

bst2.split(45);